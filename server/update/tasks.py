from __future__ import absolute_import
import os
import shlex
import subprocess
from update.celery import app


@app.task
def updateWinrate():
    print 'update start'
    mx_process = subprocess.Popen(
        shlex.split('scrapy crawl herowinrate'),
        cwd=os.path.abspath(os.path.join(
            os.path.dirname(__file__),
            '../maxspider/maxspider/spiders'
        )),
    )
    mx_process.wait()
    print 'Complete'
