---
slug: get-a-head-start-building-your-next-django-app-with-the-crowdbotics-app-builder
date: 2019-03-12
title: 'Get a Head Start Building Your Next Django App with the Crowdbotics App Builder'
categories: ['django']
description:  '---'
published: true
author: 'Aman Mittal'
banner:
---

![](https://cdn-images-1.medium.com/max/2560/1*zgprFSKNjOWI-JDSlOHFCQ.jpeg)

If you are a web developer, choosing a web framework to build an app is a big deal. There are quite a number of frameworks out there to pick from, each designed to meet general as well as specific requirements.

Django is an open source backend framework that focuses on one simple principle: rapid development. By following common pragmatic paradigms such as using MVC (_model-view-controller_) core architecture, and having its own Object Relation Mapper (_ORM_) to make database CRUD operation calls, Django makes it to build complicated features quickly.

Another philosophy the Django community follows is called DRY (or _Don’t Repeat Yourself_ ) that states that you write the code in a way such that you can reuse it instead of writing too much boilerplate code in your application

**In this tutorial, you will be building a small Django web application with the help of the** [**_Crowdbotics App Builder_**](https://www.crowdbotics.com/app-builder/?utm_source=medium?utm_campaign=cb-medium?utm_content=footer) **which reduces the amount of time needed to get your Django app up and running even further.**

### What is the Crowdbotics App Builder?

**You:** _An app builder, what? Why?_

Using an app building platform is potentially one of the best things you can do in terms of saving time and cost that goes in order to build your next product or service. The Crowdbotics App Builder greatly reduces initial setup time for Django applications.

- More than 100 of Scaffolding templates are available for different runtime platforms and programming languages
- You can build a mobile app, blockchain app, web app, VR/AR, apps for wearable such as Apple watch, Android Wear, and Fitbit, slackbot and chat bots for other platforms, or even a browser extension for Google Chrome or Firefox
- Once you have selected the template and the tech stack you want to develop your app, Crowdbotics provides you a project management tool
- Currently, the project management tool is provided is in the form of creating a [Trello Board](https://trello.com/en) for you automatically with pre-loaded boilerplate template to follow a certain pattern, and focus only on building rather spending time on creating a new boilerplate every time you start a new project
- After you are done building your app, the next step is hosting or deployment. Crowdbotics has a solution for you. Just by a single click, you can deploy your web applications and similar projects on Heroku. This step is not mandatory as the team behind Crowdbotics understand the _expression of freedom_ and do allow you to deploy your app on the platform of your own choice
- Last, important piece in this picture is that if you are facing problems with your product and want external help, you can always contact Crowdbotics on-demand team of experts to help you with solutions.

With these steps, I do not want to convey that this is a promotional article. Those are not my intentions. I just want you to know everything I know about this app building process such that if you decide to use Crowdbotics platform as a service, you know what you are getting into.

The workflow is simple and the intention is to help solo/indie/startup and existing team to build and launch their product(s) without spending too much time in scaffolding or generating the project. Crowdbotics has multiple boilerplate ready to use projects to get you started.

In the next section, you will be building your first Web App app with Django and Crowdbotics.

### Requirements

- [**Python 3.6**](https://www.python.org/downloads/release/python-365/)
- [**pipenv**](https://pypi.org/project/pipenv/)
- [**Postgresql**](https://www.postgresql.org/download/)

### Setting up a Crowdbotics App

To setup a Crowdbotics app, you have to visit [**app.crowdbotics.com**](https://app.crowdbotics.com/dashboard/) and register an account. You can either login from Github or use other authentication (_an email_) options to create a new account. Once you are logged in you will be welcomed by the [**dashboard**](https://app.crowdbotics.com/dashboard/) screen similar to below.

Click on the big plus sign button to create a new application and it will prompt with options of which tech stack to choose from in the next window.

![](https://cdn-images-1.medium.com/max/1200/1*KeOJrPJbKFRYDBGYwJQaFA.png)

Choose _Django_ under the category web app.

![](https://cdn-images-1.medium.com/max/1200/1*PiUj-DxoRdaieLtrPdxN9g.png)

Scroll down below and enter the name of the application and click the button `Create my app!`.

![](https://cdn-images-1.medium.com/max/1200/1*1AJ0_474nBVTyveDPVmZvQ.png)

In a matter of seconds, the app builder will generate a new application for you. You will be prompted with a dashboard interface of your project. There are so many options for you to do such as collaborating over Slack with your team members, or viewing the source code of your project on Github or requesting for a designer or developer from Crowdbotics services and so on.

![](https://cdn-images-1.medium.com/max/1200/1*9WFdGqkqZTsynvuy-rObog.png)

The Crowdbotics App Builder generates an automatic Github repository under their host name. It also shows recent PRs and commits made on the Github repository. So take a halt and take a look at this repository. To use this scaffolded project, all you have to do is clone this repository and start working on it. There is a `README.md` file attached to every project or app generated using Crowdbotics app builder that has a reference on how to get started.

![](https://cdn-images-1.medium.com/max/800/1*S_fGktw5tLlX73dc80emKw.png)

Open your favorite terminal and run the below command to clone the repository.

The Github URL in your case will be different depending on the name of your web application. Once the cloning is done, traverse inside the project directory. You will get the following structure.

![](https://cdn-images-1.medium.com/max/800/1*FbZ91erI5uykGyAMN1_8DA.png)

Take a look at the project structure. `djangowebapp_demo_1240` is your main project builder.

Open up `Pipfile` and look out for the packages that are needed to install in order to run this web app. In this line, notice that our project requires you to have Python version `3.6` installed on the local dev machine.

```shell
python_version = "3.6"
```

If you do not have it already, use the below command from terminal to install.

```shell
pipenv --python 3.6
```

Also run the below command, to install all dependencies described in `Pipfile`.

```shell
pipenv install
```

### App Settings

In the previous section, you looked into the project structure made available to us by Crowdbotics App Builder. Now, take a look at the file called `settings.py`. You will notice many different settings such as `DEBUG` mode, application definitions, middlewares, database setting, setting up Timezone or enabling/disabling Internationalization.

```py
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True
```

There are many other settings, but we are not going to look at them in detail here. The main concern in this section is to get familiarize with the concept of `App Definitions`. Django comes pre-installed with some default apps such as authentication and session manager apps. An app in Django is known as a self-contained unit of code which can be executed on its own. Take a look at the section `INSTALLED_APP` in the above file.

Each app can operate different functionalities such as serving a webpage to the browser or handle user authentication, handle user session and so on. Any apps you create or install a third-party, has to be added and mentioned in this section.

### Running the Development Server

To verify that a Django project works, run the following command.

```shell
python manage.py runserver
```

If the above command successfully runs, you will see a similar output below.

```shell
Performing system checks...

System check identified no issues (0 silenced).

You have unapplied migrations; your app may not work properly until they are applied.
Run 'python manage.py migrate' to apply them.

Django version 1.11, using settings 'mysite.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

Django server always run at `http://127.0.0.1:8000/` unless you want to change the the port. Using the development server you can create your app rapidly and test it well before deploying on the production.

### Creating your first app

To create our first Django app run the following command from a terminal window.

```shell
python manage.py startapp helloworldapp
```

Django comes with the utility that automatically generates the basic directory structure of an app. All you have to focus is on writing the code rather than creating files and folders. Using `manage.py` command, the newly created Django is created as a top level module in the directory structure rather than a sub module.

The directory structure of the `helloworldapp` will be similar to below.

```shell
helloworldapp/
            __init__.py
            admin.py
            apps.py
            migrations/
                      __init__.py
            models.py
            tests.py
            views.py
```

To get Django to recognize the newly created app, open `settings.py` file and add the name of your app under `INSTALLED_APPS` section.

```shell
# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'helloworldapp'
]
```

#### Applying Migrations

Now run the development server and visit the URL `http://127.0.0.1:8000/` in the browser. When the page loads, you will get the warning that you have unfulfilled migrations. Migrations in a Django app, help you change the database schema without losing any previous data. Whenever a new database model is created, running migrations will update the existing database tables to use the new schema without you having to lose any data. Migrations also help you to avoid going through the process of dropping and recreating the whole database yourself.

To use migrations in our application, run the following command.

```shell
python manage.py migrate
```

If the command runs successfully, you will see a similar output like below.

```shell

Operations to perform:
  Apply all migrations: sessions, auth, contenttypes, admin
Running migrations:
  Rendering model states... DONE
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying sessions.0001_initial... OK
```

Try running the development server again and visit the local host URL again, you are not going to see any warnings this time.

#### Adding a Template

You will have to create templates in the `helloworldapp` directory to avoid errors in the future. Use the following terminal commands and create new folder `templates` and inside it a new file called `index.html` which is going to be our first view.

```shell
cd helloworldapp
mkdir templates
touch index.html
```

Next, open the `index.html` file and the following snippet.

```html
<html>
  <head>
    <title>Home Page</title>
  </head>
  <body>
    Hello world
  </body>
</html>
```

This page will still not render as you haven’t configured the views and let the Django app know about the new view to render. To configure views, go to the `helloworldapp` directory and inside it, open file `views.py`. Add the following content.

```py
from __future__ import unicode literals
from django.shortcuts import render
from django.views.generic import TemplateView

class HomeView(TemplateView):
  template_name= 'index.html'
```

A view in Django app determines what to display on a given route. In the above file, you are telling the Django app to render the HTML file `index.html`. However, this will not work. We still need to setup a route and map it to this view.

### Mapping the route

To map the route to our view, open a file called `urls.py` inside `djangowebapp-demo-1240/djangowebapp_demo_1240`. It consists of the following code.

```py
"""djangowebapp_demo_1240 URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url('', include('home.urls')),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^api/v1/', include('home.api.v1.urls')),
    url(r'^admin/', admin.site.urls),
]
```

Modify this file accordingly.

```py
rom django.conf.urls import url, include
from django.contrib import admin
from helloworldapp.views import HomeView

url patterns = [
  url(r'^$', HomeView.as_view()),
  url(r'^accounts/', include('allauth.urls')),
  url(r'^api/v1/', include('home.api.v1.urls')),
  url(r'^admin/', admin.site.urls),
]
```

Now go back to the root directory and run the development server with the following command.

```py
python manage.py runserver
```

In the browser window, you will notice the following result.

![](https://cdn-images-1.medium.com/max/800/1*kRbFzIQupZsnltyTE68jFg.png)

### Conclusion

This is just a start.

If you are already a Django expert, I urge you to take a look at this process of building the application that saves a lot of time.

> [Originally published at Crowdbotics](https://medium.com/crowdbotics/get-a-head-start-building-your-next-django-app-with-the-crowdbotics-app-builder-4999080954e)
