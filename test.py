dict1 = {'serviceInfo': {'period': {'quater': 'Q2'}, 'gst_time': 'Quaterly'}}

print(list(dict1['serviceInfo']['period'].values())[0])

# {period : q2}