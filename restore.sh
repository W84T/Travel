
#!/bin/bash
# Restore PocketBase data from a backup
if [ -z "$1" ]; then
  echo "Usage: ./restore.sh <path_to_backup_tar_gz>"
  exit 1
fi

BACKUP_FILE=$1

if [ ! -f "$BACKUP_FILE" ]; then
  echo "Error: Backup file not found!"
  exit 1
fi

echo "Stopping PocketBase container..."
docker stop tourism_pocketbase

echo "Restoring data from $BACKUP_FILE..."
docker run --rm -v tourism_pb_data:/pb_data -v $(pwd):/backup alpine sh -c "rm -rf /pb_data/* && tar -xzvf /backup/$BACKUP_FILE -C /"

echo "Starting PocketBase container..."
docker start tourism_pocketbase

echo "Restore completed successfully."
