# KKTAG

A music list editing demo for Meichu Hackathon(KKBOX group). Used KKBOX API and Fetch API
The goal is to get a new song list dynamically from your old song lists or song with specific tags.

## Problem

We may often make a new song list, listen it for a while, and then throw it away for some reason. For example, we may be tired of most of the songs but not all, be addicted to another genre for a while and forget the original song, or thus feel lazy to listen to old song lists suddenly for no reason.

However, the next time when we want to have a new song list, we may
* Refer to the old song lists, click the preferred song, be redirected to the song page, and finally add only one song to the new song list
* Feel lazy to find from the old song lists, just recall the preferred song, search it, and add only one song to the new song list
* Think some original old song lists to be great but just want some feelings at this moment. However, these feelings are scattered in many song lists, and we are impossible to find them by listening all of them

## Solution

### Create a new song list from old song lists

During the process of establishing a new song list, we have a page to watch all the song lists that enable us to click through and can add the preferred songs by just click those songs. 

By easily browsing all song lists on creating a new song list, we can save a lot of time and will also not omit good songs accidently.

### Filter songs by customized tags

A song list is limited by a theme. We may make a new song list depending on genres, singers, emotion, languages, etc. However, for example, given a song list that was created according to the rock genre, we may sometime just want to listen to rock songs from a specific singer or a band. 

Therefore, we created a feature to enable users to add self-defined tags to filter out the preferred songs from one or many song lists depending on the user's need. For the above mentioned example, we may give band tags and genre tags to songs. When we want to listen to rock genres from a specific band, we just choose rock genre tag and this specific band to get desired songs. We can also freely filter songs from a certain song list or many song lists.

![](https://github.com/soravolk/KKTAG/blob/master/KKTAG.png)
