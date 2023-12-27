---
title: 'Pomodoro technique with CLI on macOS'
date: '2023-12-28'
slug: 'pomodoro-with-cli'
thumbnail: '/thumbnails/terminal.png'
tag: 'tools'
canonicalUrl: 'https://amanhimself.dev/blog/pomodoro-with-cli/'
---

I often turn to the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) when I'm overwhelmed by my to-do list. This method involves working for a set period (X minutes), followed by a short break (Y minutes), promoting focused sessions.

After trying various apps that lacked the simplicity I desired, I discovered a straightforward command line tool.

## Prerequisites

Before diving into the specifics, here is what you will need:

- Install [timer](https://github.com/caarlos0/timer) &mdash; a small utility written in Go that has features such as displaying progress using a progress bar, showing remaining time and named timers.
- Make sure that you are using a terminal app (such as iTerm) with alert notifications enabled.

## Using timer

The timer command accepts a duration argument with a unit specifier (`s` for seconds, `m` for minutes, `h` for hours, and so on). For example, to set a timer for 30 seconds:

```shell
timer 30s
```

![Executing the timer command with a duration of 30 seconds.](/images/pomodoro-1.png)

You can also add a description to your timer using the `-n` flag:

```shell
timer 30s -n "Some task"
```

## Notification using tput bel

[`tput`](https://www.gnu.org/software/termutils/manual/termutils-2.0/html_chapter/tput_1.html) is a versatile command that allows shell scripts to perform things such as clear the screen, underline the text, or ring a bell (beep).

You can combine it with `timer` to get an alert when your session ends.

```shell
timer 30s -n "Short break" && tput bel
```

If your terminal window is in the background and alerts are enabled, you will receive a notification as shown below:

![A notification is sent by tput command after the timer is complete.](/images/pomodoro-2.png)

## Conclusion

This setup offers a minimalistic approach to a commonly used technique to manage your focus sessions.
