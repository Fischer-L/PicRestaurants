const express = require('express');
const path = require("path");
const app = express();

const paths = {
  publicDir: path.resolve('./dist'),
  indexPage: path.resolve('./dist/index.html')
};

app.use(express.static(paths.publicDir));

app.get("/", (req, res) => {
  res.sendFile(paths.indexPage);
});

app.listen(3000, () => console.log("PicRestaurant app listening on port 3000!"));


// const https = require('https');
// function getYelp(callback) {
//   let options = {
//     hostname: "api.yelp.com",
//     path: "/v3/graphql",
//     method: "POST",
//     headers:{
//       "Content-Type": "application/graphql",
//       "Authorization": "Bearer sOYYMYOqu9CCT1csQhoPzzONCu6FyMNAkTkr_rvZH33c13UMr3xNah8P3pMNRM3AF65fZ9JIIsLpMcmq9ApReszLV859RQvSk3E-MNV-AD5vzA06BkdDuo95WnLEWnYx",
//     }
//   };
//   postData = `{
//     search(sort_by: "rating", limit: 50, open_at: 1522829755, location: "taipei") {
//       total
//       business {
//         name
//         rating
//         review_count
//         photos
//         is_closed
//         display_phone
//         location {
//           address1
//           city
//           state
//           country
//         }
//         hours {
//           is_open_now
//           open {
//             end
//             start
//             day
//           }
//         }
//       }
//     }
//   }`;
//   let req = https.request(options, resp => {
//     let data = "";
//     resp.on("data", chunk => data += chunk);
//     resp.on("end", () => {
//       console.log("Fetch Yelp ended with", data);
//       callback(data);
//     });
//   });
//   req.on('error', (e) => {
//     console.error(`problem with request: ${e.message}`);
//   });
//   req.write(postData);
//   req.end();
// }