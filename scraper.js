// tinyscraper
// All functionality
// @author Vivek Bhookya

// These urls are used to construct the appropriate Google search
var url1 = 'https://www.google.com/search?safe=active&q=';
var url2 =
  '&npsic=0&rflfq=1&rldoc=1&rlha=0&rllag=40417254,-88914589,66646&tbm=' +
  'lcl&sa=X&ved=0ahUKEwjii9nYsoncAhXC6oMKHQ1MD7YQtgMIOA#rlfi=hd:;si:;mv:!1m3!1d1731836.' +
  '4266827106!2d-88.8142053!3d40.1643782!2m3!1f0!2f0!3f0!3m2!1i120!2i213!4f13.1;tbs:lrf:!2m1!1e3!2m1!1e16!3sIAE,lf:1,lf_ui:4';

// USA states + District of Columbia
var abbr = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS',
  'MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA',
  'RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
];

var states = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware', 'District of Columbia', 'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma',
  'Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas',
  'Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
];

$(document).ready(function () {
  $("#scrape").click(scrape);
  $("#open").click(open);
});

// Function scrape()
// Gets search parameters, cleans it, and calls get() with the query for
//  each state
function scrape() {
  let search = document.getElementById('search').value.trim();

  if (search !== '') {
    while (search.includes(' ')) {
      search = search.replace(' ', '+');
    }
    search += '+phone+number+';
    // alert('search: ' + search);

    // Google may ban you after receiving too many requests in too little time
    // Simply search for whatever and solve the captcha to rerun
    for (let i = 0; i < states.length; i++) {
      get(i, search);
    }
  }
}

// Function open()
// Opens tinyscraper in a new tab should one not prefer the popup
function open() {
  chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.create(
        {url: 'chrome-extension://papmnpdppbcnpmdbapdpfldemfcekdoi/popup2.html'}
      );
  });
}

// Function get()
// Constructs full url and does JQuery $.get() to retrieve the url's DOM
// @param idx Index to collect state and abbr of
// @param search The search query of the desired organization
function get(idx, search) {
  let url = url1 + search + states[idx] + url2;
  console.log(url);

  // Thank you, http://api.jquery.com/jQuery.get/
  $.get(url, function(response) {
    print(response, idx);
  });
}

// Function print()
// Finds phone numbers in the DOM and prints a string with the state abbr and
//  the phone numbers in JS format
// Entire document will appear as a giant JS dictionary -- ready for copy paste
function print(response, idx) {
  // Collect elements containing the phone numbers
  let data = $(response).find('.lqhpac span');

  // str is the finished output
  let str = '[';

  // Collect phone number items and clean them up
  for (let i = 0; data[i] !== undefined; i++) {
    if ( data[i].innerHTML[0] === '(' ) {
      str += data[i].innerHTML.replace('(','').replace(')','').replace('-','').replace(' ','');
      if ( data[i+1] !== undefined)
      str += ', ';
    }
  }

  // Properaly format the output (WY is the last state)
  if (abbr[idx] !== 'WY') {
    str += '],';
  }
  else {
    str += ']';
  }

  // Bug fixer
  str = str.replace(', ]', ']');
  let preface = '\'' + abbr[idx] + '\': ';

  // Have fun
  document.getElementById(abbr[idx]).innerHTML = preface + str;
}
