#!/usr/bin/env python3
import os
from pymongo import MongoClient
import logging

url = os.getenv('MONGODB_ATLAS_URL')
username = os.getenv('MONGODB_ATLAS_USER')
password = os.getenv('MONGODB_ATLAS_PWD')

logging.basicConfig(level=logging.INFO, format="%(message)s")
log = logging.getLogger(__name__)

def main():
	'''Connect to MongoDB Atlas, pass credentials and url,
	select and use bookstore DB and authors/book collections.
	Prints total number of authors and each of their books.'''
	client = None
	try:
		client=MongoClient(url, username = username, password = password)
		client.admin.command("ping")
		log.info("Successfully connected to MongoDB Atlas!")
		db = client["bookstore"]
		authors = db["authors"]
		books = db["books"]
		author_ids = authors.distinct("_id")
		
		query = {"_id": {"$in": author_ids}}
		total_authors = authors.count_documents(query)
		print(f"Authors: {total_authors}")
		log.info("There are %d authors queried", total_authors)
		
		for i in authors.find(query):
			print(f"\n{i['name']}")
			for j in books.find({"author_ids":i["_id"]}):
				print(f"  {j['title']} ({j['published_year']})")
	except Exception:
		log.exception("Failed to achieve task")
	finally:
		if client is not None:
			client.close()
			log.info("Connection closed")

if __name__ == "__main__":
    main()
	
