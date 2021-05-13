import { assert } from "https://deno.land/std@0.95.0/testing/asserts.ts";
import parse from "../mod.js";

Deno.test('parser', async () => {
  assert(parse, 'parse exists')
})

Deno.test('can parse arc file', async () => {
  let arcFile = await Deno.readTextFile('mock/app.arc')
  let arc = await parse(arcFile)
  assert(arc, 'parsed arc file', arc)
})

Deno.test('can parses @app', async () => {
  let arcFile = await Deno.readTextFile('mock/app.arc')
  let arc = await parse(arcFile)
  console.log('\nAPP\n', arc.app)
  assert(arc.app, 'parsed app')
})

Deno.test('can parses @aws', async () => {
  let arcFile = await Deno.readTextFile('mock/app.arc')
  let arc = await parse(arcFile)
  console.log('\nAWS\n', arc.aws)
  assert(arc.aws, 'parsed aws')
})

Deno.test('can parse @static', async () => {
  let arcFile = await Deno.readTextFile('mock/app.arc')
  let arc = await parse(arcFile)
  console.log('\nSTATIC\n', arc.static)
  assert(arc.static, 'parsed static')
})

Deno.test('can parse @http', async () => {
  let arcFile = await Deno.readTextFile('mock/app.arc')
  let arc = await parse(arcFile)
  console.log('\nHTTP\n', arc.http)
  assert(arc.http, 'parsed http')
})


Deno.test('can parse @proxy', async () => {
  let arcFile = await Deno.readTextFile('mock/app.arc')
  let arc = await parse(arcFile)
  console.log('\nPROXY\n', arc.proxy)
  assert(arc.proxy, 'parsed proxy')
})

Deno.test('can parse @ws', async () => {
  let arcFile = await Deno.readTextFile('mock/app.arc')
  let arc = await parse(arcFile)
  console.log('\nWS\n', arc.ws)
  assert(arc.ws, 'parsed ws')
})

Deno.test('can parse @events', async () => {
  let arcFile = await Deno.readTextFile('mock/app.arc')
  let arc = await parse(arcFile)
  console.log('\nEVENTS\n', arc.events)
  assert(arc.events, 'parsed events')
})

Deno.test('can parse @scheduled', async () => {
  let arcFile = await Deno.readTextFile('mock/app.arc')
  let arc = await parse(arcFile)
  console.log('\nSCHEDULED\n', arc.scheduled)
  assert(arc.scheduled, 'parsed scheduled')
})

Deno.test('can parse @queues', async () => {
  let arcFile = await Deno.readTextFile('mock/app.arc')
  let arc = await parse(arcFile)
  console.log('\nQUEUES\n', arc.queues)
  assert(arc.queues, 'parsed queues')
})

Deno.test('can parse @tables', async () => {
  let arcFile = await Deno.readTextFile('mock/app.arc')
  let arc = await parse(arcFile)
  console.log('\nTABLES\n', arc.tables)
  assert(arc.tables, 'parsed tables')
})

Deno.test('can parse @indexes', async () => {
  let arcFile = await Deno.readTextFile('mock/app.arc')
  let arc = await parse(arcFile)
  console.log('\nINDEXES\n', arc.indexes)
  assert(arc.indexes, 'parsed indexes')
})
