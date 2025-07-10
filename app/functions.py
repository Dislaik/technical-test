from collections import deque

def generate_matrix_map(size_x: int, size_y: int) -> None:
  matrix = [[{'number': 0, 'visited': False} for x in range(size_x)] for y in range(size_y)]

  matrix[3][2]['number'] = 42
  matrix[3][2]['visited'] = True

  print(matrix)

def source_move(where: str) -> str | None:
  if where == 'up':
    return ""
  elif where == 'down':
    return ""
  elif where == 'left':
    return ""
  elif where == 'right':
    return ""
  else:
    return None

def find_path(cells: list, start: list, dest: list) -> list:
  rows = len(cells)
  cols = len(cells[0])
  queue = deque()
  visited = set()
  parent = {}

  queue.append(tuple(start))
  visited.add(tuple(start))

  while queue:
    current = queue.popleft()

    if list(current) == dest:
      path = []

      while current != tuple(start):
        path.append(list(current))
        current = parent[current]
      path.append(start)
      path.reverse()

      return path

    x, y = current

    current_value = cells[y][x]['number']

    for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
      nx, ny = x+dx, y+dy

      if 0 <= nx < cols and 0 <= ny < rows:
        next_value = cells[ny][nx]['number']

        if next_value != 0 and current_value % next_value == 0:
          if (nx, ny) not in visited:
            visited.add((nx, ny))
            parent[(nx, ny)] = current
            queue.append((nx, ny))

  return []