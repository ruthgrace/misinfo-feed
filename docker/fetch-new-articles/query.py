import os
import openai
import argparse
import time
from testcases import TESTCASES
import random
import colorama
from dotenv import load_dotenv
from my_logger import logger, set_level
import logging
import sys

colorama.init(autoreset=True)
DEFAULT_LOGLEVEL = logging.ERROR

parser = argparse.ArgumentParser()
parser.add_argument('-p', dest='prompt', type=str, required=False)
parser.add_argument('-a', dest='a', action='store_true', required=False)
parser.add_argument('-v', dest='verbose', help='log verbosity, default ERROR, -v = INFO, -vv = DEBUG', action='count', default=0)
args = parser.parse_args()

if args.verbose:
    set_level(40 - (args.verbose * 10))


# Set up your OpenAI API key
load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')
expected_response = None

def strtobool(response):
    first_word = response.split()[0].lower()
    if "no" in first_word:
        return False
    elif "yes" in first_word:
        return True

def check_prompt(prompt, expected_response):
    response = gen_request(prompt, expected_response) 
    return output_response(response, expected_response)

def call_chatgpt(conversation):
    # Call the OpenAI API to generate a response
    try:
        return openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=conversation,
            #prompt=user_prompt,
            temperature=0.2,
            max_tokens=100
        )
    except openai.error.RateLimitError:
        logger.warning('Ratelimited')
        time.sleep(3)
        return call_chatgpt(conversation)

def gen_request(user_input, expected_response):
    logger.info(f'Checking prompt: {user_input}, expected response is {expected_response}')

    user_prompt = f'Is a news headline "{user_input}" related to health, health care, disease, or public health in any way? Please answer "Yes" or "No". If you are unsure, say "Unsure".'
    conversation = [
        #{"role": "system", "content": "You are ChatGPT, a large language model trained by OpenAI.  You are trained to look at a sentence and give a yes or no answer as to whether the sentence is healthcare related."},
        {"role": "user", "content": user_prompt},
    ]
    return call_chatgpt(conversation)

def check_response(response, expected_response):
    response_bool = strtobool(response)
    if expected_response is not None:
        if response_bool is None:
            logger.info(colorama.Fore.YELLOW + '[UNSURE]: AI did not return a definitive answer')
            return
        elif expected_response == response_bool:
            logger.info(colorama.Fore.GREEN + '[SUCCESS]: Reply matched expected response!')
            return True
        else:
            logger.info(colorama.Fore.RED + '[FAILURE]: Reply did not match expected response!')
            return False
    else:
        if response_bool is not None:
            return response_bool

def output_response(response, expected_response):
    assistant_reply = response['choices'][0]['message']['content']

    logger.info("ChatGPT: " + assistant_reply)
    return check_response(assistant_reply, expected_response)
    
def main():
    if args.prompt:
        logger.info(f'Checking prompt: {args.prompt}')
        check_prompt(args.prompt, None)
    elif args.a:
        logger.info('Checking all testcases')
        failures = 0
        total = len(TESTCASES)
        for testdata in TESTCASES:
            # 'Unsure' is currently considered a failure
            if not check_prompt(*testdata):
                failures += 1
        logger.info(f'Success Rate: [{total - failures}/{total}] ({(total - failures) / total * 100}%)')
    else:
        testdata = random.choice(TESTCASES)
        check_prompt(*testdata)


if __name__ == "__main__":
    main()
