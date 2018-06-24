package com.verizon.api.url;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="urls")
public class Url {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
    @Column(name = "long_url", unique = true)
	private String longUrl;
    
    @Column(name = "short_url", unique = true)
	private String shortUrl;
	
	
	public Url() {
		
	}
	
	public Url(int id, String longUrl, String shortUrl) {
		super();
		this.id = id;
		this.longUrl = longUrl;
		this.shortUrl = shortUrl;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getLongUrl() {
		return longUrl;
	}
	public void setLongUrl(String longUrl) {
		this.longUrl = longUrl;
	}
	public String getShortUrl() {
		return shortUrl;
	}
	public void setShortUrl(String shortUrl) {
		this.shortUrl = shortUrl;
	}
	
	
	
}
