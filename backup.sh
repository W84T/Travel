
#!/bin/bash
# Backup PocketBase data volume
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/pb_data_$TIMESTAMP.tar.gz"

mkdir -p "$BACKUP_DIR"

echo "Creating PocketBase backup..."
# Temporarily stop the container to ensure data consistency
docker stop tourism_pocketbase
tar -czvf "$BACKUP_FILE" -C ./volumes pb_data/ 2>/dev/null || docker run --rm -v tourism_pb_data:/pb_data -v $(pwd)/$BACKUP_DIR:/backup alpine tar -czvf /backup/pb_data_$TIMESTAMP.tar.gz -C / pb_data
docker start tourism_pocketbase

echo "Backup completed: $BACKUP_FILE"
