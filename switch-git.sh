#!/bin/bash

case "$1" in
  lead)
    git config user.name "meeeed23-maker"
    git config user.email "meeeed23@gmail.com"
    echo "✅ Switched to LEAD account"
    ;;
  reviewer)
    git config user.name "mhamedachbani"
    git config user.email "hamed.achbani@uit.ac.ma"
    echo "✅ Switched to REVIEWER account"
    ;;
  *)
    echo "Usage: ./switch-git.sh {lead|reviewer}"
    ;;
esac

echo "Current user:"
git config user.name
git config user.email