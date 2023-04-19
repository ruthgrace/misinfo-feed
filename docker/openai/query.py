import openai
import os
import argparse
from testcases import TESTCASES
import random
import colorama

colorama.init(autoreset=True)

parser = argparse.ArgumentParser()
parser.add_argument('-p', dest='prompt', type=str, required=False)
parser.add_argument('-a', dest='a', action='store_true', required=False)
args = parser.parse_args()

# Set up your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')
expected_response = None

def strtobool(response):
    first_word = response.split()[0].lower()
    if "no" in first_word:
        return False
    return True

def check_prompt(prompt, expected_response):
    response = gen_request(prompt, expected_response) 
    output_response(response, expected_response)

def call_chatgpt(conversation):
    # Call the OpenAI API to generate a response
    return openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=conversation,
        #prompt=user_prompt,
        temperature=0.4,
        max_tokens=100
    )

def gen_request(user_input, expected_response):
    print(f'Checking prompt: {user_input}, expected response is {expected_response}')

    user_prompt = f'Is this phrase related to health, disease, or public health? Please answer "Yes" or "No". If you are unsure, say "Unsure". The headline is: {user_input}'
    #user_prompt = f'Does the phrase "{user_input}" relate to health care in any way?'
    conversation = [
        {"role": "system", "content": "You are ChatGPT, a large language model trained by OpenAI.  You are trained to look at a sentence and give a yes or no answer as to whether the sentence is healthcare related."},
        {"role": "assistant", "content": "I'm doing well, thank you! How can I help you?"},
        {"role": "user", "content": user_prompt},
    ]
    return call_chatgpt(conversation)

def output_response(response, expected_response):
    assistant_reply = response['choices'][0]['message']['content']

    print("ChatGPT: " + assistant_reply)

    if expected_response is not None:
        if expected_response == strtobool(assistant_reply):
            print(colorama.Fore.GREEN + '[SUCCESS]: Reply matched expected response!')
            return True
        else:
            print(colorama.Fore.RED + '[FAILURE]: Reply did not match expected response!' + colorama.Fore.WHITE)
            return False
    

if args.prompt:
    print(f'Checking prompt: {args.prompt}')
    check_prompt(args.prompt, None)
elif args.a:
    print('Checking all testcases')
    for testdata in TESTCASES:
        check_prompt(*testdata)
else:
    testdata = random.choice(TESTCASES)
    check_prompt(*testdata)


