// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default function handler(req, res) {
  axios.get('https://api.github.com/users/octocat')
.then(res => {
  console.log(">>>", res)
})
}


