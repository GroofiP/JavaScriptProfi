let words = `'This is a longer card with supporting text below as a natural lead-in to additional content.' 'This content is a little bit longer.' 'This is aren't'`
re = /(\b|)'(?!\b)|(?!\b)'(\b|)/gi
words = words.replace(re, '"')
console.log(words)