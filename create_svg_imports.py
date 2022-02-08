# Little script to create a large import file for React
import json
import os

import_string = ''
object_array_string = 'const svgs = ['

with open('data.json') as f:
    data = json.load(f)

soundIDs = data['soundIDs']
participantIDs = data['participantIDs']

for i, p in enumerate(participantIDs):
    for j, s in enumerate(soundIDs):
        svg_name = 'svg_{}_{}'.format(i, j)
        with open('./sketches/{}/{}.svg'.format(p, s)) as f:
            svg = f.read()
        # make svg fit for inline use in react (camel case)
        svg = svg.replace('<?xml version="1.0" encoding="utf-8" ?>', '')
        svg = svg.replace(':ev', 'Ev')
        svg = svg.replace(':xlink', 'Xlink')

        # add vector effect
        svg = svg.replace('path', 'path vectorEffect="non-scaling-stroke"')
        import_string += 'const {} = ({});\n'.format(
            svg_name, svg)
        object_array_string += '\n{'
        object_array_string += 'soundID:"{}",participantID:"{}",svg:{}'.format(
            s, p, svg_name)
        object_array_string += '},'

# Remove last comma
object_array_string = object_array_string[:-1]
object_array_string += '\n]'

final_string = '{}\n{}\nexport default svgs;'.format(
    import_string, object_array_string)

with open('svgImport.js', 'w') as f:
    f.write(final_string)
