## 重装debian注意事项


- jetbrain家的软件无法输入中文，需要加一句-Drecreate.x11.input.method=true 
- sudo dpkg-reconfig locales 记得加入中外两种utf
- grub2软件要在/etc/default中设置好grub2的DISABLE\_OS\_PROBER='false'的选项，否则无法检测到其他系统
- xrandr --output DP-4 --scale 1.1x1.1，然后设置gnome的比例为200%基本解决2k屏幕眼瞎问题。
- 笔记本休眠无法醒来有待解决
