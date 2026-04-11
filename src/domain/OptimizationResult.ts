import { assertFiniteNumber, assertNonNegativeInteger, assertPositiveInteger, assertProbability } from "./DomainPrimitives";

export interface OptimizationRunResult {
    readonly nfe: number;
    readonly success: boolean;
    readonly bestFitness: number;
}

export interface OptimizationSummary {
    readonly problemName: string;
    readonly totalRuns: number;
    readonly successfulRuns: number;
    readonly successRate: number;
    readonly averageNfe: number;
    readonly bestFitness: number;
}

export function createOptimizationRunResult(result: OptimizationRunResult): OptimizationRunResult {
    assertPositiveInteger(result.nfe, "nfe");
    assertFiniteNumber(result.bestFitness, "bestFitness");

    return Object.freeze({
        nfe: result.nfe,
        success: result.success,
        bestFitness: result.bestFitness
    });
}

export function createOptimizationSummary(summary: OptimizationSummary): OptimizationSummary {
    const normalizedProblemName = summary.problemName.trim();

    if (normalizedProblemName.length === 0) {
        throw new Error("problemName must not be empty.");
    }

    assertPositiveInteger(summary.totalRuns, "totalRuns");
    assertNonNegativeInteger(summary.successfulRuns, "successfulRuns");
    assertProbability(summary.successRate, "successRate");
    assertPositiveInteger(summary.averageNfe, "averageNfe");
    assertFiniteNumber(summary.bestFitness, "bestFitness");

    if (summary.successfulRuns > summary.totalRuns) {
        throw new Error("successfulRuns must not exceed totalRuns.");
    }

    return Object.freeze({
        problemName: normalizedProblemName,
        totalRuns: summary.totalRuns,
        successfulRuns: summary.successfulRuns,
        successRate: summary.successRate,
        averageNfe: summary.averageNfe,
        bestFitness: summary.bestFitness
    });
}
