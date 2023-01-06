#!/bin/sh
echo "Please enter password to continue"
read -r userpass
while [ "$userpass" != tim7steve ] ; do
    echo "That password is incorrect. Please enter password to continue."
    read -r userpass
done
echo "Hi Mom, this is your helpful password manager. What operation do you want to do?"
read -r operation
echo "We are going to '$operation'. What account do you want to do that for?"
read -r account
if [ "$operation" = "add" ] ||  [ "$operation" = "change" ]; then
    echo "What do you want to set your username to?"
    read -r username
    echo "And what do you want to set your password to?"
    read -r password
    java src.Password "$operation" "$account" "$username" "$password"
else
    java src.Password "$operation" "$account"
fi
