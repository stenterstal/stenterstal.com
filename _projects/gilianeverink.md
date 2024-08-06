---
published: true
title: "Gilianeverink.nl"
excerpt: "Minimalist personal website build for a friend using React, Typescript and NextJS. Hosted as a static SPA on Github Pages"
thumbnail: "/assets/blog/gilianeverink.nl/thumbnail.png"
date: "05-08-2024"
ogImage:
  url: "/assets/blog/gilianeverink.nl/thumbnail.png"
tags:
  - webdev
  - react
---

![aaa](/assets/blog/gilianeverink.nl/preview.png)

A friend of mine approached me with the question if I could make a simple minimalist website for him to replace his default namecheap parking page. 
His domain is generally only used to host mail but some more technological knowledgeable people might try to browse to [gilianeverink.nl](https://gilianeverink.nl)

I made a simple one-page design with React+Typescript+Vite using `yarn create vite`.  Instead of CSS I like to use SCSS so I can nest styles and use variables.
The site features a single CSS media query for a correct display on mobile phones.

### Deployment
Because hosting costs money and I like to be cheap the site is hosted on [github pages](https://pages.github.com/).
The only problem with this is that my own site (this site) is also hosted here and Namecheap DNS doesn't like it when you use a path in your CNAME record.
This is needed because my own site is already pointing to [stenterstal.github.io](https://stenterstal.github.io) and we have to point the site to [stenterstal.github.io/gilianeverink.nl/](https://stenterstal.github.io/gilianeverink.nl/).

To solve this there are basically 2 options. Make a Github account for Gilian so we can point the Namecheap CNAME record to `gilianeverink.github.io` or make a Cloudflare account (Cloudflare does enable you to use a path in your CNAME record)

I went with making him a Cloudflare account instead of the Github account route. Using Cloudflare gives a couple nice benefits like automatic HTTPS rewrites, caching and DDOS protection. All while being free.
With the site still being hosted on my own Github account and repo I can still easily push new updates of the site without Gilian needing me to give access to a repo on his account.

### Links
- [Gilianeverink.nl](https://gilianeverink.nl)
- [Git repo](https://github.com/stenterstal/gilianeverink.nl)