package com.verizon.api.url;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UrlService {
	
	@Autowired
	private TopicRepository topicRepository;


	public List<Url> getAllUrls() {
		final List<Url> urls = new ArrayList();
		topicRepository.findAll()
			.forEach(urls::add);
		return urls;
	}
	
	public Optional<Url> getUrl(long id) {
		return topicRepository.findById(id);
	}
	
	@Cacheable(value = "url", key="#shortUrl")  
	public Optional<Url> getUrl(String shortUrl) {
		return topicRepository.findByShortUrl(shortUrl);
	}
	
	@CacheEvict(value = "url", allEntries = true) 
	public void addUrl(Url url) {
		topicRepository.save(url);
	}

	@CacheEvict(value = "url", allEntries = true) 
	public void updateUrl(long id, Url url) {
		if (!topicRepository.existsById(id)) {
			throw new Error("Provided URL ID does not exist!");
		}
		url.setId(id);
		topicRepository.save(url);
	}

	@CacheEvict(value = "url", allEntries = true) 
	public void deleteUrl(long id) {
		topicRepository.deleteById(id);
	}

}
