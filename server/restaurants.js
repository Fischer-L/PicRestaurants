const https = require('https');

function getRestaurants(query, onOK, onError) {
  if (!query.location) {
    onError(new Error("The location is a MUST"));
    return;
  }

  let querys = [
    `limit: 50`,
    `sort_by: "rating"`,
    `location: "${query.location}"`
  ];
  if (query.open_at && query.open_at > 0) {
    querys.push(`open_at: ${query.open_at}`);
  }

  let postData = `{
    search(${querys.join(",")}) {
      total
      business {
        name
        rating
        review_count
        photos
        is_closed
        display_phone
        location {
          address1
          city
          state
          country
        }
        hours {
          is_open_now
          open {
            end
            start
            day
          }
        }
      }
    }
  }`;
  let options = {
    hostname: "api.yelp.com",
    path: "/v3/graphql",
    method: "POST",
    headers:{
      "Content-Type": "application/graphql",
      "Authorization": "Bearer sOYYMYOqu9CCT1csQhoPzzONCu6FyMNAkTkr_rvZH33c13UMr3xNah8P3pMNRM3AF65fZ9JIIsLpMcmq9ApReszLV859RQvSk3E-MNV-AD5vzA06BkdDuo95WnLEWnYx",
    }
  };
  let req = https.request(options, resp => {
    let data = "";
    resp.on("data", chunk => data += chunk);
    resp.on("end", () => onOK(data));
  });
  req.on('error', e => onError(e));
  req.write(postData);
  req.end();
}

module.exports = getRestaurants;
