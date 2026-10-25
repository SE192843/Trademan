/**
 * CalculatorView — Page-level layout for the AP Calculator feature.
 * The ONLY component that calls useAPCalculator() and distributes state
 * to InputPanel and ResultsPanel.
 */

import { useAPCalculator } from '@/hooks/useAPCalculator';
import { InputPanel } from '@/components/InputPanel';
import { ResultsPanel } from '@/components/ResultsPanel';

export function CalculatorView() {
  const {
    formValues,
    errors,
    result,
    hasCalculated,
    handleChange,
    handleSubmit,
    handleReset,
  } = useAPCalculator();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left column: Input form */}
        <div>
          <InputPanel
            formValues={formValues}
            errors={errors}
            hasCalculated={hasCalculated}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />

          {/* Quick stats - game rules summary */}
          <div className="mt-4 game-card border border-game-border/50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              📋 Quy Tắc Game
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: '⚡', value: '65', label: 'AP / Run' },
                { icon: '☠️', value: '10', label: 'Honor / Quái' },
                { icon: '🎯', value: '3', label: 'Baseline Quái' },
              ].map((item) => (
                <div key={item.label} className="bg-black/20 rounded-lg p-2">
                  <div className="text-lg">{item.icon}</div>
                  <div className="font-mono font-bold text-game-accent text-sm">{item.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Results */}
        <div>
          {result ? (
            <ResultsPanel result={result} />
          ) : (
            <EmptyResultsPlaceholder />
          )}
        </div>
      </div>
    </div>
  );
}

/** Placeholder shown before any calculation */
function EmptyResultsPlaceholder() {
  return (
    <div className="game-card border border-dashed border-game-border/50 flex flex-col items-center justify-center py-16 text-center animate-pulse-slow">
      <div className="text-6xl mb-4 opacity-30">⚔️</div>
      <p className="text-gray-500 font-semibold">Kết quả sẽ hiển thị tại đây</p>
      <p className="text-gray-600 text-sm mt-2">
        Nhập AP và Điểm Danh Dự, sau đó nhấn <span className="text-game-accent">Tính Toán</span>
      </p>
    </div>
  );
}
