import { AnimatePresence, motion } from "motion/react";
import { springSnappy } from "../design/springs";
import { useFontStore } from "../state/fontStore";
import { useT } from "../lib/i18n";

export function BulkProgress() {
  const t = useT();
  const bulk = useFontStore((s) => s.bulk);
  const indeterminate = !bulk || bulk.total === 0;
  const pct = bulk && bulk.total > 0 ? (bulk.done / bulk.total) * 100 : 0;
  return (
    <AnimatePresence>
      {bulk && (
        <motion.div
          className="install-toast glass-e3"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={bulk.total}
          aria-valuenow={bulk.done}
          initial={{ opacity: 0, y: -24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.97 }}
          transition={springSnappy}
        >
          <div className="install-head">
            <span className="install-title">
              {bulk.op === "uninstall" ? t("bulk.uninstalling") : t("bulk.emptying")}
            </span>
            <span className="install-count tabular">
              {bulk.done} / {bulk.total}
            </span>
          </div>
          <div className="install-track">
            {indeterminate ? (
              <div className="install-fill" style={{ width: "40%" }} />
            ) : (
              <motion.div
                className="install-fill"
                animate={{ width: `${pct}%` }}
                transition={springSnappy}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
