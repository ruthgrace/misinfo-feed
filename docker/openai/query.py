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
    elif "yes" in first_word:
        return True

def check_prompt(prompt, expected_response):
    response = gen_request(prompt, expected_response) 
    return output_response(response, expected_response)

def call_chatgpt(conversation):
    # Call the OpenAI API to generate a response
    return openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=conversation,
        #prompt=user_prompt,
        temperature=0.2,
        max_tokens=100
    )

def gen_request(user_input, expected_response):
    print(f'Checking prompt: {user_input}, expected response is {expected_response}')

    user_prompt = f'Is a news headline "{user_input}" related to health, health care, disease, or public health in any way? Please answer "Yes" or "No". If you are unsure, say "Unsure".'
    #user_prompt = f'Does the phrase "{user_input}" relate to health care in any way?'
    conversation = [
        {"role": "system", "content": "You are ChatGPT, a large language model trained by OpenAI.  You are trained to look at a sentence and give a yes or no answer as to whether the sentence is healthcare related."},
        {"role": "assistant", "content": "I'm doing well, thank you! How can I help you?"},
        {"role": "user", "content": user_prompt},
    ]
    return call_chatgpt(conversation)

def check_response(response, expected_response):
    if expected_response is not None:
        response_bool = strtobool(response)
        if not response_bool:
            print(colorama.Fore.YELLOW + '[UNSURE]: AI did not return a definitive answer')
            return
        if expected_response == response_bool:
            print(colorama.Fore.GREEN + '[SUCCESS]: Reply matched expected response!')
            return True
        else:
            print(colorama.Fore.RED + '[FAILURE]: Reply did not match expected response!')
            return False

def output_response(response, expected_response):
    assistant_reply = response['choices'][0]['message']['content']

    print("ChatGPT: " + assistant_reply)
    return check_response(assistant_reply, expected_response)
    

if args.prompt:
    print(f'Checking prompt: {args.prompt}')
    check_prompt(args.prompt, None)
elif args.a:
    print('Checking all testcases')
    failures = 0
    total = len(TESTCASES)
    for testdata in TESTCASES:
        # 'Unsure' is currently considered a failure
        if not check_prompt(*testdata):
            failures += 1
    print(f'Success Rate: [{total - failures}/{total}] ({(total - failures) / total * 100}%)')

else:
    testdata = random.choice(TESTCASES)
    check_prompt(*testdata)

