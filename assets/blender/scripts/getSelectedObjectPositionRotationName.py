import bpy
import json
import os

selection_names = bpy.context.selected_objects

positions=[]
for i in selection_names:
    loc = [i.location.x, i.location.y, i.location.z]
    rot = [i.rotation_euler.x, i.rotation_euler.y, i.rotation_euler.z]
    positions.append({ "name": i.name, "location": loc, "rotation": rot })
    
print(positions)