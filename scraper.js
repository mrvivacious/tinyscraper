// tinyscraper
// @author Vivek Bhookya

var url1 =  'https://www.google.com/search?safe=active&q=ywca+phone+number+';
  // 'https://www.google.com/search?safe=active&q=';

var url2 =
  '&npsic=0&rflfq=1&rldoc=1&rlha=0&rllag=40417254,-88914589,66646&tbm=' +
  'lcl&sa=X&ved=0ahUKEwjii9nYsoncAhXC6oMKHQ1MD7YQtgMIOA#rlfi=hd:;si:;mv:!1m3!1d1731836.' +
  '4266827106!2d-88.8142053!3d40.1643782!2m3!1f0!2f0!3f0!3m2!1i120!2i213!4f13.1;tbs:lrf:!2m1!1e3!2m1!1e16!3sIAE,lf:1,lf_ui:4';

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

function scrape() {
  let search = document.getElementById('search').value;

  if (search !== undefined) {
    while (search.includes(' ')) {
      search = search.replace(' ', '+');
    }
    search += '+phone+number+';
    alert('search: ' + search);

    // uncomment me to use
    // for (let i = 0; i < states.length; i++) {
    //   get(i);
    // }
  }
}

function open() {
  chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.create(
        {url: 'chrome-extension://cobhhiebnknmehjjnoipjagaabhokfch/popup2.html'}
      );
  });
}

function get(idx) {
  // console.log('search1: ' + search);

  let url = url1 + states[idx] + url2;
  // let url = url1 + search + states[idx] + url2;
  console.log(url);
  // console.log('search2: ' + search);

  $.get(url, function(response) {
    print(response, idx);
  });
}

// prints in javascript format
function print(response, idx) {
  let data = $(response).find('.lqhpac span');

  let str = '[';

  for (let i = 0; data[i] !== undefined; i++) {
    if ( data[i].innerHTML[0] === '(' ) {
      str += data[i].innerHTML.replace('(','').replace(')','').replace('-','').replace(' ','');
      if ( data[i+1] !== undefined)
      str += ', ';
    }
  }

  // Properaly format the output
  if (abbr[idx] !== 'WY') {
    str += '],';
  }
  else {
    str += ']';
  }

  str = str.replace(', ]', ']');
  let preface = '\'' + abbr[idx] + '\': ';

  document.getElementById(abbr[idx]).innerHTML = preface + str;
}
