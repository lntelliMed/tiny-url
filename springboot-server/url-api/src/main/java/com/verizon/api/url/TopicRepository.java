package com.verizon.api.url;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface TopicRepository extends CrudRepository<Url, Long> {
	public Optional<Url> findByShortUrl(String shortUrl);

}
