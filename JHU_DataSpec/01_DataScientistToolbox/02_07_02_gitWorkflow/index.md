---
title       : Example Git/GitHub Workflow
subtitle    : 
author      : Jeffrey Leek, Assistant Professor of Biostatistics 
job         : Johns Hopkins Bloomberg School of Public Health
logo        : bloomberg_shield.png
framework   : io2012        # {io2012, html5slides, shower, dzslides, ...}
highlighter : highlight.js  # {highlight.js, prettify, highlight}
hitheme     : tomorrow   # 
url:
  lib: ../../libraries
  assets: ../../assets
widgets     : [mathjax]            # {mathjax, quiz, bootstrap}
mode        : selfcontained # {standalone, draft}

---

## An example workflow

* Feel free to create a test repo of your own (on your GitHub account) and follow along
* This is not meant to be an exhaustive introduction to all Git and GitHub features
* Best way to learn Git and GitHub are by using them
* If you get stuck, use the resources at the end of the last lecture

---

## Create a new repo on GitHub

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/01createNewRepo.png" height='400'/>

* Leave the box next to "Initialize this repository with a README" __unchecked__, since we will add one later

---

## Copy repo URL to clipboard

* After clicking "create repository", you will get a screen with some basic instructions for getting started
* They are a good starting point, but we won't follow them exactly here
* Copy the URL displayed below to your clipboard (yours will be slightly different since it depends on your username and repo name)

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/02copyURL.png" height='160'/>

---

## Create a new local directory

* Open Git Bash or Terminal (Windows or Mac, respectively) and create a new directory on your computer
* "Step inside" of this new directory with the `cd` command
* `mkdir` stands for "make directory", `cd` stands for "change directory", and `ls` stands for "list"
* Since we get no output after typing `ls`, we can see that the directory we created is still empty

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/03makeDirectory.png" height='250'/>

---

## Create a new file in directory

* Open your favorite text editor and create a new text file
* Make sure to save it in the directory you just created

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/04createFile1.png" height='100'/>
<br>
<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/05saveFile.png" height='250'/>

---

## Create a new repo locally

* We already created a __GitHub__ repository, but we still need to create a __Git__ repository locally on your computer
* We can see that our new file is now in our chosen directory with `ls`
* `git init` initializes a Git repo in our current directory
* `git status` is a helpful command that we'll make frequent use of
  * Does exactly what is sounds like -- gives us a "status report" for our local repo

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/06newFileStatus.png" height='250'/>

---

## Stage file for commit

* Notice that our newly created file falls under "untracked files" when we look at `git status`
* Use `git add` to tell Git that we want it to start "paying attention" to this file
  * Could have used `git add test_file.txt` for the same result, but `git add .` is often easier if you are okay tracking all currently untracked files

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/07gitAdd.png" height='350'/>

---

## Commit changes

* Using `git commit` with a `-m` after it tells Git that whatever follows in double quotes is the message that we want to attach to this round of changes
* Another call to `git status` confirms that there is nothing new to commit (since our first commit)

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/08_01gitCommit.png" height='250'/>

---

## Check log

* `git log` shows us a history of all commits
* So far, there's only one

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/08_02gitLog.png" height='250'/>

---

## Add link to remote repo

* We now have a remote repo on GitHub's servers and a local repo on our computer, but they still don't know about each other
* To establish a link between the two, we paste the URL copied earlier from GitHub as follows

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/09gitRemoteAdd.png" height='150'/>

* `git remote -v` shows us that our GitHub repo is now set up as a "remote" repository for our local repo, which allows the two repos to communicate

---

## Push changes to GitHub

* We want our GitHub repo to reflect the changes we've made locally (i.e. to contain our new text file)
* `git push -u origin master` tells Git to push our changes to the "master" (or main) branch of the "origin" (or primary) remote
* You only need to include the `-u origin master` once, as Git will remember this configuration for future `push`es
  * `git push` then becomes sufficient, assuming you don't want to do anything fancy

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/10gitPush.png" height='240'/>

---

## Check status

* Check status again for piece of mind
* Notice that it confirms _Your branch is up-to-date with 'origin/master'_

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/11gitStatus.png" height='250'/>

---

## Check GitHub

* We want to make sure that our changes made it to GitHub safely and indeed they did
* Our text file shows up in the file list

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/12checkGitHub.png" height='300'/>

---

## Add README file from GitHub

* How can we can "pull" changes from a remote repository to our local repository?
* To illustrate, we'll add and edit a README file directly from the GitHub website 
* A more common scenario would be that a collaborator makes changes to a shared repository and you want to incorporate those changes into your local repo
* Click on the "Add a README" button on your GitHub repo page, under the list of files

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/13_01addReadme.png" height='75'/>

---

## Edit README file from GitHub

* Put anything you want in the README, then press "Commit New File" to commit the file to your GitHub repo
* **Note:** README files written in Markdown will render in HTML on your repository's homepage.

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/13_02editReadme.png" height='225'/>
<br>
<br>
<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/14commitNewFile.png" height='75'/>

---

## Fetch changes from GitHub

* Now that README.md exists on GitHub, we want to "pull" it down to our local repo
* There is a `git pull` command that allows you to do this, but it's recommended that you instead use a combination of `git fetch` and `git merge`
* `git fetch origin` tells Git to fetch all changes from the "origin" (primary) remote repo, which we set up earlier with `git remote add origin ...`

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/15gitFetch.png" height='300'/>

---

## Merge changes into local repo

* Git is now aware of all changes that have been made to the remote (i.e. GitHub) repo
* Still need to incorporate these changes into our local repo
* `git branch -a` shows us that we now have two "branches" stored on our computer: `master` and `remotes/origin/master`
* `master` represents the files on our local repo and `remotes/origin/master` represents the files we pulled from our remote repo
* Use `git merge origin/master` to incorporate the changes from our remote repo

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/16gitMerge.png" height='250'/>

---

## Check status

* A quick call to `ls` confirms that the README.md file is now in our local directory
* `git status` tells us that we have no new changes and are up-to-date with our remote repo

<img class=center src="../../assets/img/01_DataScientistToolbox/gitWorkflow/17gitStatus.png" height='300'/>
