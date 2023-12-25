import matplotlib.pyplot as plt
import networkx as nx

# Create a graph
G = nx.Graph()

# read the file
f = open("input.txt", "r")
lines = f.readlines()
f.close()
for line in lines:
    line = line.strip()
    line = line.split(": ")
    for i in line[1].split(' '):
        G.add_edge(line[0], i)

# Visualize the graph using matplotlib
pos = nx.fruchterman_reingold_layout(G)  # Layout algorithm
nx.draw(G, pos, with_labels=True, font_weight='bold', node_size=700, node_color='skyblue', font_size=8, font_color='black', edge_color='gray', linewidths=1, alpha=0.7)

# Show the plot
plt.show()