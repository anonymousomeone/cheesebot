const fetch = require('node-fetch');
var prefix = 'c!' // change if u updating prefixes
var blist = [];
var slist = []
var dlist = ['469520953999753216']

function nuke(message) {
  if (message.mentions.members.first()) {
    let victim = message.mentions.members.first().user;
    if (!dlist.includes(victim.id)) {
      if (!blist.includes(victim.id)) {
        if (!slist.includes(message.author.id)) {
          let l = blist.length;
          blist.push(victim.id);
          slist.push(message.author.id);
          setTimeout(function() {
            blist.filter(function(v, i, a) {
              if (v === victim.id) {
                a.splice(i, 1)
              }
            });
          }, 120000);
          // 3.6e+6
          setTimeout(function() {
            slist.filter(function(s, i, a) {
              if (s === message.author.id) {
                a.splice(i, 1)
              }
            });
          }, 10000);
          // 600000

          const args = message.content.slice(prefix.length).trim().split(/ +/);

          if (message.mentions.users.first() && args.length == 1) {
              url = 'https://www.reddit.com/r/yiff.json?limit=100'
          } else {
              url = 'https://www.reddit.com/r/' + args[args.length - 1] +'.json?limit=100'
          }

          let settings = { method: "Get" };
          
          fetch(url, settings)
          .then(res => res.json())
          .then((json) => {
              if (json.data.dist != 0){
                  for (var i = 0; i < json.data.children.length; i++) {
                      if (json.data.children[i].data.url) {
                          if (json.data.children[i].data.url.endsWith(".gif") === true || json.data.children[i].data.url.endsWith(".png") === true || json.data.children[i].data.url.endsWith(".jpg") === true) {
                            victim.send({ files: [json.data.children[i].data.url] }).catch(err => 1 + 1);
                          }
                      }
                  }
              } else {
                  return message.channel.send('This subreddit doesnt exist')
              }
          })
            .catch(err => 1 + 1);

          message.channel.send(victim.tag + ' is now being *educated*')
        } else {
          message.channel.send('You can only educate someone someone every 10 seconds')
        }
      } else {
        message.channel.send('That user has already been educated in the past 2 minutes')
      }
    } else {
      message.channel.send('The developers do not require education')
    }
  }
}

exports.nuke = nuke;
