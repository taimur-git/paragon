/*
import Test from '../Test.svelte'
import { render } from "@testing-library/svelte";
import { tick } from 'svelte';
import { expect, it, describe, afterEach, test } from 'vitest'

let host: HTMLElement

afterEach(() => {
  host.remove()
})

test('mount component', async () => {
  host = document.createElement('div')
  host.setAttribute('id', 'host')
  document.body.appendChild(host)
  const instance = new Test({ target: host, props: { count: 4 } })
  expect(instance).toBeTruthy()
  expect(host.innerHTML).toContain('4 x 2 = 8')
  expect(host.innerHTML).toMatchSnapshot()
  const btn = host.getElementsByTagName('button')[0]
  btn.click() // or btn.dispatchEvent(new window.Event('click', { bubbles: true }))
  await tick()
  expect(host.innerHTML).toContain('4 x 3 = 12')
  btn.click()
  await tick()
  expect(host.innerHTML).toContain('4 x 4 = 16')
})*/