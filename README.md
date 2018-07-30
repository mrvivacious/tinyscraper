# tinyscraper
Chrome extension that scrapes all phone numbers of any/most agencies in the USA in every state.

Outputs the data as a copy-pastable JS dictionary.
<br>
### How to deploy
Clone this repo to an easy-to-find place on your computer. For example, this clones the repo to a folder called tinyscraper in your Desktop:
```
cd Desktop && git clone https://github.com/mrvivacious/tinyscraper.git tinyscraper
```
<br>
Go to chrome://extensions in Chrome and turn on "Developer mode" in the top right corner.
<br>
Select "LOAD UNPACKED" and load the folder of tinyscraper.
<hr>

### Updating the extension
Reload the extension through chrome://extensions.

<br>

### <em>"I want 2 scrape my own stuff from every state."</em>

Change the jQuery (and associated reformatting procedures) in scrape() with the id of the desired element. 
