// Step 2: 
// use bookstore 
db = db.getSiblingDB("bookstore")

// Step 3: load authors.json
db.authors.drop()
doc = JSON.parse(fs.readFileSync("authors.json", "utf8"))
db.authors.insertMany(doc)

// Step 4: load books.json
db.books.drop()
doc = JSON.parse(fs.readFileSync("books.json", "utf8"))
db.books.insertMany(doc)

// Step 5: list authors and books
db.authors.find()
db.books.find()

// Step 6: insert two new books
db.books.insertMany([
  { title: 'The Count of Monte Cristo', published_year: 1846, author_ids: ['author_004'] },
  { title: 'Frankenstein', published_year: 1818, author_ids: ['author_005'] }
])
// Step 7: add missing authors
db.authors.insertMany([
  {
    _id: 'author_004',
    name: 'Alexandre Dumas',
    nationality: 'French',
    bio: {
      short: 'French novelist best known for The Three Musketeers',
      long: 'Alexandre Dumas (1802-1870) was a prolific French writer whose historical adventure novels, including The Count of Monte Cristo (1844-46) and The Three Musketeers (1844), remain hugely popular. Born to a Haitian-French general of mixed-race ancestry, he worked with collaborators to produce an enormous volume of novels, plays, and journalism. His writing earned him great fame and fortune, though his lavish spending left him in debt late in life.'
    }
  },
  {
    _id: 'author_005',
    name: 'Mary Shelley',
    nationality: 'British',
    bio: {
      short: 'British novelist best known for Frankenstein',
      long: "Mary Shelley (1797-1851) was an English novelist best known for Frankenstein; or, The Modern Prometheus (1818), which she began writing at age 18 and which is often considered the first science fiction novel. The daughter of philosopher William Godwin and feminist writer Mary Wollstonecraft, she was married to the poet Percy Bysshe Shelley. She continued writing novels, stories, and travel books throughout her life, and edited her husband's works after his death."
    }
  }
])
// Step 8: filter books by a list of authors
db.books.find({ author_ids: { $in: ["author_001", "author_004"] } })
