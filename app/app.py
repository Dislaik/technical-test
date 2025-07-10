from flask import Flask, render_template, request, url_for, redirect, session
from functions import * 
import os
import json

app = Flask(__name__)
app.secret_key = os.urandom(24)
title = "Evaluación Técnica - Matías N. Salas"

@app.route('/')
def index():
  data = {
    "title": title
  }

  return render_template('index.html', data=data)

@app.route('/play', methods=['GET', 'POST'])
def play():
  if request.method == 'GET':
    return redirect(url_for('index'))

  size_x = int(request.form.get('size-x'))
  size_y = int(request.form.get('size-y'))
  load_cells = request.form.get('load-cells')
  init_cell = request.form.get('init-cell')
  dest_cell = request.form.get('dest-cell')

  init_coords = [int(n) for n in init_cell.split()]
  dest_coords = [int(n) for n in dest_cell.split()]
  raw_rows = load_cells.strip().split('\n')
  rows = []

  for y, row in enumerate(raw_rows):
    cols = row.replace('\r', '').strip().split()
    row_cells = []
    for x, c in enumerate(cols):
      row_cells.append({
        'x': x,
        'y': y,
        'number': int(c),
        'visited': False
      })
    rows.append(row_cells)

  path = find_path(rows, init_coords, dest_coords)

  if path:
    for x, y in path:
      rows[y][x]['visited'] = True

  data = {
    "title": title,
    "size_x": size_x,
    "size_y": size_y,
    "load_cells": rows,
    "path": path,
    "init_coords": init_coords,
    "dest_coords": dest_coords
  }
  
  return render_template('play.html', data=data )

@app.route("/result", methods=['GET', 'POST'])
def result():
  if request.method == 'GET':
    return redirect(url_for('index'))

  size_x = int(request.form.get("size_x"))
  size_y = int(request.form.get("size_y"))
  init_cell_str = request.form.get("init_cell")
  dest_cell_str = request.form.get("dest_cell")
  load_cells_str = request.form.get("load_cells")

  init_coords = [int(x) for x in init_cell_str.strip().split()]
  dest_coords = [int(x) for x in dest_cell_str.strip().split()]
  load_cells = json.loads(load_cells_str)

  for y, row in enumerate(load_cells):
    for x, cell in enumerate(row):
      cell['x'] = int(cell['x'])
      cell['y'] = int(cell['y'])
      cell['number'] = int(cell['number'])
      cell['visited'] = False

  path = find_path(load_cells, init_coords, dest_coords)

  if path:
    for x, y in path:
      load_cells[y][x]['visited'] = True

  data = {
    "title": title,
    "size_x": size_x,
    "size_y": size_y,
    "load_cells": load_cells,
    "path": path,
    "init_coords": init_coords,
    "dest_coords": dest_coords,
  }

  return render_template("result.html", data=data)

def not_found(error):
  data = {
    'title': 'Página no encontrada'
  }

  return render_template('not_found.html', data=data), 404

if __name__ == '__main__':
  app.register_error_handler(404, not_found)
  app.run(host="0.0.0.0", port=5000, debug=True)