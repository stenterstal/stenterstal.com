---
published: true
title: "Home server self-hosting"
excerpt: "Short overview of the why and how of my server rack and the applications hosted on it, giving back control of data and privacy while also providing a good learning experience."
thumbnail: "/assets/blog/homelab/thumbnail.jpg"
date: "25-10-2024"
ogImage:
  url: "/assets/blog/homelab/thumbnail.jpg"
tags:
  - home lab
  - docker
---

![Picture of my server rack](/assets/blog/homelab/cover.jpg)
*My server rack containing the firewall, switch and servers*

## Why selfhosting?
In an era where more and more personal information is being stored in the cloud, and with cloud providers like Google and others actively profiting from that information, 
it’s important to try to keep as much of that personal data private and "in-house" (literally, in this case).

By storing that much personal data and using services (such as email) through these providers, you also give up control of your digital presence to these companies. 
What if a bot at Google decides that your online activity is undesirable and closes your Google account, including your Gmail? In an instant, 
you could lose access to any accounts linked to that email and be left at the mercy of Google to recover your account.

Aside from addressing privacy concerns, self-hosting is also a fun way to learn more about how networks, app deployment, and internet security work—an added bonus in my view.

## In the beginning
When I first started my self-hosting journey, I only had a Raspberry Pi 4 with a couple of external HDDs attached to serve some media files. 
Soon, I outgrew the computational limitations of the Pi and decided to upgrade to a self-built system in a [Fractal Node 304](https://www.fractal-design.com/products/cases/node/node-304/black/), 
which is actually a great case for a home server if you don't want or don't have space for a rack. 
It has space for six (!) HDDs in an ITX form factor, and I installed an Intel i3-10300T, which is powerful enough to handle media transcoding using its Intel UHD Graphics 630 chip, while having a max TDP (thermal design power) of just 35W.

At first, I mainly used it for serving media (movies and shows) to my various devices using [Jellyfin](https://jellyfin.org/). 
To move away from online cloud storage from Google, I deployed an instance of [Nextcloud](https://nextcloud.com/) (which I'm now considering moving away from, as it’s too bloated), 
which also hosted my calendar and contacts book before I migrated that functionality to [BaïkalDAV](https://sabre.io/baikal/) (a lightweight CalDAV and CardDAV server).

### Network expansion
While doing all of this, I was still using my ISP’s default router, which had some features like port forwarding and a simple firewall, but lacked the advanced features I needed as the complexity of my network grew. 
Some things that were missing included VLAN support and more granular control over firewall rules.

I settled on a [Protectli FW4B](https://eu.protectli.com/product/fw4b/) and installed [OPNsense](https://opnsense.org/) on it, which is an open source fork of pfSense.
You could probably get a cheaper box to run your firewall, but since this was my first network hardware expansion, I wanted to play it safe rather than opting for an unbranded, Chinese-manufactured box.

Because "normal" _dumb_ switches don't have VLAN support, I bought a [Cisco Series 350 managed switch](https://www.cisco.com/c/en/us/support/switches/350-series-managed-switches/series.html) to replace a TP-Link 8 port switch I had. 
WWhile having 24 ports and supporting all the advanced features I needed, it was still small enough to fit in my past "network shelf" (AKA Ikea Kallax), but it also had a 19-inch rack mount for proper rack installation.

Leveraging the new firewall and switch I seperated my network in multiple VLAN's;
- A DMZ for the externally exposed server using port-forward
- An "internal" DMZ for the internal server
- "Main" VLAN for trusted devices like my PC and phone
- IOT VLAN with no internet access to stop devices from "talking home"

Because devices in the DMZ don’t have access to any other devices on the network, this adds an extra layer of security in case of a compromised machine. 
The same rule is applied to the IoT VLAN, as these smart devices run on manufacturers' firmware, over which I have no control in terms of safety and potential backdoors.

## Exposing services to the internet
Replacing cloud services with local applications that are not accessible from the internet defeats the purpose of a Cloud. 
Therefore, the applications running in Docker containers on the external-facing server (in the DMZ) are exposed to the outside world via a reverse proxy, with additional security measures in place.
I also have applications hosted on another internal server, but because these are not exposed to the internet they are not referenced in this post.

![Flow of exposing services to the internet](/assets/blog/homelab/network_flow.png)

#### Reverse proxy
One of the main challenges of exposing multiple applications in Docker containers to the internet is that you can only forward one port 80 (HTTP) and one port 443 (HTTPS) from your router or firewall. 
A possible workaround is to assign each container a different port (e.g., one on port 80 and another on port 8080), but this approach quickly becomes cumbersome.
In this case, you would need to access the non-default HTTP/HTTPS containers using a URL like _domain.com:8080_, but it becomes difficult to remember the port number for each application quickly.

To fix this problem, I use reverse proxy called [Traefik](https://doc.traefik.io/traefik/), which provides a single point of entry on specified port(s). In my case this is only port 443 (HTTPS) to ensure all incoming traffic is secure.
With Traefik, you can set labels to route specific subdomains to each container, for example the subdomain _cloud.domain.com_ routes to the Nextcloud container, and _media.domain.com_ routes to the Jellyfin instance.

Exposing containers only through a reverse proxy ensures better scalability and security. 
If I have a new app to deploy and expose, I only need to spin up a new container with the appropriate [Traefik labels](https://doc.traefik.io/traefik/reference/dynamic-configuration/docker/), 
and everything is good to go—aside from adding the corresponding subdomain to my domain's DNS records. 
From a security perspective, this approach is a step up from exposing individual Docker containers, as the reverse proxy provides a single point of entry. 
From there, I can log all traffic, ban specific IPs attempting to brute-force anything (using fail2ban), and enable HTTPS with Cloudflare using automatic Let's Encrypt (ACME) certificates.

#### Single Sign-On
While some applications have their own authentication mechanisms, including features like 2FA, this is not always the case. 
Storing and remembering the passwords for each individual account can also become cumbersome, although modern password managers help alleviate this by offering features like auto-filling.

To simplify authentication, I use [Authentik](https://goauthentik.io/) to provide a single account for nearly all the applications I host. 
Authentik allows me to add an authentication layer in front of my deployed apps using the same labeling system as Traefik, ensuring seamless integration.

For example, when I navigate to media.domain.com, Traefik first redirects me to Authentik on auth.domain.com to check if I'm logged in. 
If I am, it redirects me back; if not, it prompts me for my credentials. Authentik supports Role-Based Access Control (RBAC), allowing me to restrict access to certain apps based on the user's assigned group. 
It can also enforce 2FA during login, enhancing security compared to many default authentication mechanisms used by apps.

In addition to providing authentication in front of other apps, Authentik can serve as an Identity Provider (IdP) for apps, using so-called [_Providers_](https://docs.goauthentik.io/docs/providers). 
For instance, Nextcloud, which has its own mobile app, can't rely on a standard redirect for authentication due to its mobile nature. 
However, Nextcloud can be configured to use an external LDAP or OAuth2 Identity Provider, which Authentik can provide.

#### Firewall and Cloudflare
The last link in this entire chain is exposing the endpoints (in this case, port 443) to the World Wide Web, so they can be accessed from the internet. 
Factors to consider include security and continuity. I don’t want bad actors to be able to brute-force any services or launch a DDoS attack on my home network to take down my servers (and internet connection).

To mitigate this, I use [Cloudflare](https://www.cloudflare.com/)  as a proxy between my IP and the internet. 
Instead of requests going directly to my IP, they first go through Cloudflare, which hides my IP address and provides additional features like DDoS protection.

The firewall forwards all HTTPS traffic to the external server on the DMZ interface and is configured to drop connections coming from non-Cloudflare IPs. 
This ensures that all incoming traffic is originating from the Cloudflare proxy.

Since I’m located in The Netherlands and only access my server from other countries via VPN, 
I’ve geo-blocked all countries except for my own through Cloudflare. 
The chance of a request coming from China or Russia being legitimate is virtually zero, which helps prevent much of the bot spam originating from those regions.

## Concluding
In summary, self-hosting offers greater control over your data and privacy while allowing you to build and manage your own digital infrastructure. 
It’s a practical way to move away from reliance on third-party services, and it provides the flexibility to customize your setup to fit your needs. 
Whether you're looking for better security, learning opportunities, or just want more control, self-hosting can be a solid choice.

### Links
- PC/NAS case: [Fractal Node 304](https://www.fractal-design.com/products/cases/node/node-304/black/)
- OPNsense box: [Protectli FW4B](https://eu.protectli.com/product/fw4b/)
- Firewall software: [OPNsense](https://opnsense.org/)
- Reverse proxy: [Traefik](https://doc.traefik.io/traefik/)
- Single Sign-On: [Authentik](https://goauthentik.io/)