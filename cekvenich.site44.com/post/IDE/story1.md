
## My (futuristic) IDE setup

I was asked recently to describe my development environment setup.

### 1. Static Front End Server 
Step one is to get a static server w/ https - as some front end .js does not work w/ http. I use site44.com for that, as they provide the certs for me - I just sign up and they serve from Dropbox. This also allows for continuous deployment. 

For production, I wrap the site44 origin w/ CDN77. They provide a free domain cert. No need to ever mess w/ certs anymore.

### 2. Mobile First/ Mobile Only
Step 2 is: Mobile First. Mostly I use the Blisk developer browser. It has watch directory features. Sometimes I use Chrome,I turn on Chrome w/ Developer Tools to view console logs(and one way to cache bust); and then click More Tools again (second level). That second menu lets me select 'remote devices'. I have a mobile device pluged in via USB at all times. This way I see in as I develop, what it looks like on mobile. Also in the network tab, I set the speed to 4g so I have a more realistic UX speed. Once it works well in mobile, I try to make it fluid so it works on modern desktop browsers.


### 4. Optional: Micro-services / Backend Cloud IDE.
We now use modern fetch() to get micro-services. You can use Bluemix Orion Cloud ( Foundry Web) IDE. Companies are starting to be come security aware, and a percentage of security issues are internal, such as a terminated employee. By keeping source code in the cloud, you add another layer of security. Since source code is in the cloud, well... your IDE is in the cloud. Bluemix (and others) provide a free https cert.

### 3. Front end (cloud) Pre-Processor
There are many pre-processors, I use Prepros.io in the cloud. A preprocessor converts a Sass file to CSS, .md file to HTML or a Pug file to html on a file save. Most CSS frameworks are developed in Sass or such, and Pug is needed to always add top menu and footer to the page - since we are using static server-less architecture. 
(Intro to Pug: <http://youtube.com/watch?v=wzAWI9h3q18>)
Once you get used to Pug, your productivity will skyrocket. 

Also, by using Sass, you are more of a team-player and designer friendly. And any other content such as images or copy in Markdown can be saved to Dropbox - and due to Site44 auto-deploys in real time, after being pre-processed so it can be static. 
Each team role can use their favorite IDE, for example to edit .md files. If I need to isolate permissions by role, I use symbolic links to folders. For example copywriters don't need to see Sass and Pug files. They have their .md folder they can read/write. Anychanges there are reflected on the origin right away (and CDN edge on a flush.)

I use Daas (Desktop as a Service) AWS Workspaces at $40/month. I spend money on very few things, the pre-processor for the team, the CDN and FTS. The rest is all free.
On the cloud desktop, I install Dropbox and PrePros.io. If any dropbox file is changed by any team member - it runs and does it's thing.

### 4a. Old-school front end IDE
You can use something like free VS Code (not Visual Studio, but 'Code'). Nice feature is that it does auto-save. I can't live w/o auto-save.
When doing some tricky stuff - I do use the Web Server for Chrome - but rarely. 

Here is a demo <https://cdn.rawgit.com/struts3/what-demos/master/demo/ide.mp4>

### 4b. For cool kids, a sexy front end IDE
Of course, cool kids can edit the web app from a table or iPad. I use a chromebook. Again - source is in the cloud, this time w/ front end code. So if I lose my laptop (like HRC), no big deal. Chromebook does not download the dropbox files. And I can edit webapp anywhere. 
To do that I setup Codeanywhere IDE for Dropbox. 

### 5. Native IOS | Android
I use build.phonegap (different from plain phonegap). I don't need to setup up Andorid or Xcode SDK locally. Mostly I upload index.html that redirects to CDN. And build.phonegap emails me .apk file or equivalent. IOS and Android developers are expensive budget item; and you need 2 of each at least. 
Since I always develop mobile first, there are few issues w/ native apps. 

Should I need any custom feature - than a small Cordova function can be outsourced. As is QA so it can be on-demand and based on specs.  
 
 At the end, I do port to desktop browsers.