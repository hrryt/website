import * as React from 'react';
import Window from '../components/Window.jsx';
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TTMaths" },
    { name: "description", content: "Home Page" },
  ];
}


export default function Home() {
  return <Window title="poopwindow">poop butt</Window>;
}
