import openai
import os
import argparse
from testcases import TESTCASES
import random

parser = argparse.ArgumentParser()
parser.add_argument('-p', dest='prompt', type=str, required=False)
args = parser.parse_args()

# Set up your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')
expected_response = None

def strtobool(response):
    first_word = response.split()[0].lower()
    if "no" in first_word:
        return False
    return True


if args.prompt:
    user_input = args.prompt
else:
    testdata = random.choice(TESTCASES)
    user_input = testdata[0]
    expected_response = testdata[1]

print(f'Checking prompt: {user_input}, expected response is {expected_response}')

user_prompt = f'Does the phrase "{user_input}" relate to health care in any way?'
conversation = [
    {"role": "system", "content": "You are ChatGPT, a large language model trained by OpenAI.  You are trained to look at a sentence and give a yes or no answer as to whether the sentence is healthcare related."},
    {"role": "assistant", "content": "I'm doing well, thank you! How can I help you?"},
    {"role": "user", "content": user_prompt},
]


# Call the OpenAI API to generate a response
response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=conversation,
    #prompt=user_prompt,
    temperature=0.4,
    max_tokens=100
)

#print(response)
assistant_reply = response['choices'][0]['message']['content']

print("Assistant: " + assistant_reply)

if expected_response is not None:
    if expected_response == strtobool(assistant_reply):
        print('[SUCCESS]: Reply matched expected response!')
    else:
        print('[FAILURE]: Reply did not match expected response!')
