from __future__ import absolute_import
from celery import Celery
from celery.schedules import crontab

app = Celery(
    'update',
    broker='redis://localhost:6379/1',
    include=['update.tasks'],
)

app.conf.update(
    CELERY_TIMEZONE='Asia/Shanghai',
    CELERY_ENABLE_UTC=True,
    CELERYBEAT_SCHEDULE={
        'add-every-30-seconds': {
            'task': 'update.tasks.updateWinrate',
            'schedule': crontab(hour=15, minute=25, day_of_week=1),
            'args': ()
        },
    }
)

if __name__ == '__main__':
    app.start()
