#!/bin/bash
set -e

mongo <<EOF
use admin
db.createUser({
  user:  '$TYPEORM_USERNAME',
  pwd: '$TYPEORM_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$TYPEORM_DATABASE'
  }]
})
EOF