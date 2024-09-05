A React-based comic book library app visualizing Marvel character connections through their shared comic appearances

## Getting Started

1. First, clone repo to local directory.

1. Run npm install

1. Create a .env file with the following:

```
MARVEL_URL=https://gateway.marvel.com/v1/public
PUBLIC_KEY=*** (provided public key)
PRIVATE_KEY=*** (provided private key)
```

1. Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

1. Enjoy! Scroll down the cards to load more cards & add nodes to the graph. Click on cards to navigate to the character profile. Click the + next to comics to add to your reading list! Try to click and drag nodes around in the graph to see the connections.

## Please note: 
I have left the physics in the graph for added fun-factor but as more characters/comics are added, performance suffers greatly. To improve performance, I have considered removing character images, optimizing images, removing the physics, and making the nodes static, but whats the fun in that!

Using Node 18+
Dependencies:
-prisma
-dotenv
-next
-sqlite3
-vis-network
-axios

Future updates:
-Optimization for large amount of nodes
-Graph generated from filtered results