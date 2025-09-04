import type { Route } from "./+types/kitchen-sink";

export default function KitchenSink({}: Route.ComponentProps) {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Font Examples</h1>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Default Sans (NewCezanne Pro M)</h2>
        <p className="font-sans text-lg">
          The quick brown fox jumps over the lazy dog. 1234567890
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Aurea Ultra Roman</h2>
        <p className="font-aurea text-lg">
          The quick brown fox jumps over the lazy dog. 1234567890
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">NewRodin Pro EB</h2>
        <p className="font-rodin text-lg">
          The quick brown fox jumps over the lazy dog. 1234567890
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">PopHappiness Std EB</h2>
        <p className="font-happiness text-lg">
          The quick brown fox jumps over the lazy dog. 1234567890
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">ITC Bolt Bold</h2>
        <p className="font-bolt text-lg">
          The quick brown fox jumps over the lazy dog. 1234567890
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Size Examples</h2>
        <div className="space-y-2">
          <p className="font-aurea text-sm">Small text (14px)</p>
          <p className="font-cezanne text-base">Base text (16px)</p>
          <p className="font-rodin text-lg">Large text (18px)</p>
          <p className="font-happiness text-xl">Extra large text (20px)</p>
          <p className="font-bolt text-2xl">2XL text (24px)</p>
        </div>
      </section>
    </div>
  );
}
