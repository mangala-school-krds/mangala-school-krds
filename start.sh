#!/bin/bash

echo "Select an option:"
echo "1) Start server"
echo "2) Stop server"
read -p "Enter choice [1 or 2]: " choice

case "$choice" in
  1)
    echo "Starting server..."
    docker-compose up -d --build
    ;;
  2)
    echo "Stopping and removing all containers + volumes..."
    docker-compose down -v --remove-orphans
    ;;
  *)
    echo "Invalid choice."
    ;;
esac
