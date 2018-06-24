package com.verizon.api.url;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.google.common.hash.Hashing;
import org.apache.commons.validator.routines.UrlValidator;


@RestController
public class UrlController {
	
	final String DOMAIN_NAME = "http://localhost:8080/";


	@Autowired
	private UrlService urlService;
	
	@Autowired
    private CacheManager cacheManager;
	
	@RequestMapping(method=RequestMethod.GET, value="/api/urls")
	public List<Url> getAllUrls() {
		return urlService.getAllUrls();
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/api/urls/{id}")
	public Optional<Url> getUrl(@PathVariable long id) {
		return urlService.getUrl(id);
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/api/urls")
    public ResponseEntity<String> addUrl(@RequestBody Url url) {
      final UrlValidator urlValidator = new UrlValidator(new String[]{"http", "https"});
      if (urlValidator.isValid(url.getLongUrl())) {
          final String shortUrl = Hashing.murmur3_32().hashString(url.getLongUrl(), StandardCharsets.UTF_8).toString();
          url.setShortUrl(shortUrl);
          urlService.addUrl(url);
          return new ResponseEntity<>(DOMAIN_NAME + shortUrl, HttpStatus.OK);
      } else {
          return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
    }
	
	@RequestMapping(method=RequestMethod.PUT, value="/api/urls/{id}")
	public ResponseEntity<String> updateUrl(@PathVariable long id, @RequestBody Url url) {
	    final UrlValidator urlValidator = new UrlValidator(new String[]{"http", "https"});
	    if (urlValidator.isValid(url.getLongUrl())) {
			urlService.updateUrl(id, url);
	        return new ResponseEntity<>(HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/api/urls/{id}")
	public void deleteUrl(@PathVariable long id) {
		urlService.deleteUrl(id);
	}
	
    @RequestMapping(value = "/clearCache")
    public void clearCache(){
        for(String name:cacheManager.getCacheNames()){
            cacheManager.getCache(name).clear();
        }
    }
    
	@RequestMapping(method=RequestMethod.GET, value="/{shortUrl}")
    public void redirect(@PathVariable String shortUrl, HttpServletResponse resp) throws Exception {
        final Optional<Url> url = urlService.getUrl(shortUrl);
        if (url.isPresent()) {
            resp.sendRedirect(url.get().getLongUrl());
        } else {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND);
        }
    }
	


}
