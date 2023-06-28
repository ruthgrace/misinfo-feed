import argparse
from my_logger import logger, set_level
import logging
import sys

DEFAULT_LOGLEVEL = logging.ERROR

parser = argparse.ArgumentParser()
parser.add_argument('-p', dest='prompt', type=str, required=False)
parser.add_argument('-a', dest='a', help='Check all testcase responses', action='store_true', required=False)
parser.add_argument('-v', dest='verbose', help='log verbosity, default ERROR, -v = INFO, -vv = DEBUG', action='count', default=0)
parser.add_argument('--force-update', dest='force_update', help='Add/update all articles from feeds to db regardless of seen status', action='store_true')
args = parser.parse_args()

if args.verbose:
    set_level(40 - (args.verbose * 10))
