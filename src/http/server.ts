import fastify from "fastify";
import { createPoll } from "./routes/create-pool";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import cookie from "@fastify/cookie";
import websocket from "@fastify/websocket";
import { pollResults } from "./ws/poll-results";

const app = fastify();

// GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD

app.register(cookie, {
  secret: "polls-app-secret",
  parseOptions: {},
});

app.addHook("onRequest", (request, reply, done) => {
  console.log("Hook onRequest acionado para todas as requisições.");
  done();
});

app.register(websocket);

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);

app.register(pollResults);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
