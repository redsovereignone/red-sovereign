/**
 * Skeleton Loader Component - Red Sovereign Design System
 * Premium loading states with shimmer effects
 */

import { motion } from 'framer-motion';
import styles from '@/styles/glassmorphism.module.css';

interface SkeletonLoaderProps {
  variant?: 'text' | 'title' | 'card' | 'button' | 'image' | 'custom';
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
  animate?: boolean;
}

export function SkeletonLoader({
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
  animate = true
}: SkeletonLoaderProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'title':
        return {
          width: width || '60%',
          height: height || '32px',
          borderRadius: '6px'
        };
      case 'text':
        return {
          width: width || '100%',
          height: height || '16px',
          borderRadius: '4px'
        };
      case 'card':
        return {
          width: width || '100%',
          height: height || '200px',
          borderRadius: '12px'
        };
      case 'button':
        return {
          width: width || '120px',
          height: height || '44px',
          borderRadius: '22px'
        };
      case 'image':
        return {
          width: width || '100%',
          height: height || '300px',
          borderRadius: '8px'
        };
      case 'custom':
        return {
          width: width || '100%',
          height: height || '40px',
          borderRadius: '8px'
        };
      default:
        return {
          width: '100%',
          height: '16px',
          borderRadius: '4px'
        };
    }
  };

  const baseStyles = getVariantStyles();

  const skeletonElement = (
    <motion.div
      className={`${styles.skeleton} ${animate ? styles.shimmer : ''} ${className}`}
      style={{
        ...baseStyles,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.02) 100%)',
        position: 'relative',
        overflow: 'hidden',
        transform: 'translateZ(0)', // GPU acceleration
        willChange: 'transform'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {animate && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)',
            transform: 'translateX(-100%)'
          }}
          animate={{
            transform: ['translateX(-100%)', 'translateX(100%)']
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'easeInOut'
          }}
        />
      )}
    </motion.div>
  );

  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }, (_, i) => (
          <div key={i}>{skeletonElement}</div>
        ))}
      </div>
    );
  }

  return skeletonElement;
}

/**
 * Skeleton Card Component
 */
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`${styles.glass} p-6 rounded-xl ${className}`}>
      <SkeletonLoader variant="image" height="200px" className="mb-4" />
      <SkeletonLoader variant="title" width="70%" className="mb-2" />
      <SkeletonLoader variant="text" count={3} />
      <div className="flex gap-2 mt-4">
        <SkeletonLoader variant="button" width="100px" />
        <SkeletonLoader variant="button" width="100px" />
      </div>
    </div>
  );
}

/**
 * Skeleton Table Component
 */
export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className={`${styles.glass} p-6 rounded-xl`}>
      {/* Header */}
      <div className="flex gap-4 mb-4 pb-4 border-b border-gray-800">
        <SkeletonLoader variant="text" width="150px" height="20px" />
        <SkeletonLoader variant="text" width="200px" height="20px" />
        <SkeletonLoader variant="text" width="100px" height="20px" />
        <SkeletonLoader variant="text" width="120px" height="20px" />
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex gap-4 py-3">
          <SkeletonLoader variant="text" width="150px" />
          <SkeletonLoader variant="text" width="200px" />
          <SkeletonLoader variant="text" width="100px" />
          <SkeletonLoader variant="text" width="120px" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton Form Component
 */
export function SkeletonForm() {
  return (
    <div className={`${styles.glass} p-6 rounded-xl space-y-6`}>
      <div>
        <SkeletonLoader variant="text" width="100px" height="14px" className="mb-2" />
        <SkeletonLoader variant="custom" height="44px" />
      </div>
      <div>
        <SkeletonLoader variant="text" width="120px" height="14px" className="mb-2" />
        <SkeletonLoader variant="custom" height="44px" />
      </div>
      <div>
        <SkeletonLoader variant="text" width="80px" height="14px" className="mb-2" />
        <SkeletonLoader variant="custom" height="100px" />
      </div>
      <SkeletonLoader variant="button" width="100%" height="48px" />
    </div>
  );
}

/**
 * Skeleton Modal Component
 */
export function SkeletonModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        className={`relative w-full max-w-2xl ${styles.glassPremium} rounded-2xl p-8`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <SkeletonLoader variant="title" width="50%" className="mb-4" />
        <SkeletonLoader variant="text" count={4} className="mb-6" />
        <div className="grid grid-cols-2 gap-4 mb-6">
          <SkeletonLoader variant="card" height="120px" />
          <SkeletonLoader variant="card" height="120px" />
        </div>
        <div className="flex gap-3 justify-end">
          <SkeletonLoader variant="button" />
          <SkeletonLoader variant="button" width="140px" />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Skeleton Metric Card
 */
export function SkeletonMetric() {
  return (
    <div className={`${styles.glass} p-6 rounded-xl`}>
      <div className="flex items-center justify-between mb-2">
        <SkeletonLoader variant="text" width="100px" height="14px" />
        <SkeletonLoader variant="custom" width="24px" height="24px" />
      </div>
      <SkeletonLoader variant="title" width="120px" height="36px" className="mb-1" />
      <SkeletonLoader variant="text" width="80px" height="12px" />
    </div>
  );
}

export default SkeletonLoader;