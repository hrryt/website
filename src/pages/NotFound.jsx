import Window from '../components/Window.jsx';

export default function NotFound() {
  return (
    <main>
      <aside></aside>
      <Window title="Error">
        <img class="http-error" src="https://httpducks.com/404.jpg" />
      </Window>
    </main>
  );
}
