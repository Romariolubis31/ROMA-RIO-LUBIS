import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PROJECTS,
  HERITAGE_SITES,
  filterProjects,
  computePortfolioMetrics,
  getProjectsForSite,
  projectGeoToMap,
} from './portfolioData';
import {
  SURVEY_MODELS,
  generateSitePointCloud,
  projectPoint3D,
} from './pointCloudMath';

test('filterProjects returns all projects for "all" and empty search', () => {
  const result = filterProjects(PROJECTS, 'all', '');
  assert.equal(result.length, PROJECTS.length);
  assert.ok(result.length >= 19, 'Expected full CV project catalog');
});

test('filterProjects filters accurately by category', () => {
  const maritime = filterProjects(PROJECTS, 'maritime-underwater', '');
  assert.ok(maritime.length >= 2);
  assert.ok(maritime.every((p) => p.category === 'maritime-underwater'));
  assert.ok(maritime.some((p) => p.id.includes('pulau-tikus')));
  assert.ok(maritime.some((p) => p.id.includes('lambur')));
});

test('filterProjects matches bilingual search queries case-insensitively', () => {
  const gp = filterProjects(PROJECTS, 'all', 'gunung padang');
  assert.equal(gp.length, 2);

  const rescue = filterProjects(PROJECTS, 'all', 'MRT');
  assert.equal(rescue.length, 1);
  assert.ok(rescue.some((p) => p.id === 'mrt-jakarta-rescue-2025'));

  const empty = filterProjects(PROJECTS, 'all', 'xyznonexistent999');
  assert.equal(empty.length, 0);
});

test('computePortfolioMetrics calculates consistent non-zero totals', () => {
  const metrics = computePortfolioMetrics(PROJECTS, HERITAGE_SITES);
  assert.equal(metrics.totalProjects, PROJECTS.length);
  assert.equal(metrics.totalSites, HERITAGE_SITES.length);
  assert.ok(metrics.totalProvinces >= 7);
  assert.equal(metrics.certificationsCount, 4);
});

test('getProjectsForSite links Gunung Padang & Bengkulu sites cleanly', () => {
  const gpProjects = getProjectsForSite('gunung-padang', PROJECTS);
  assert.equal(gpProjects.length, 2);

  const bengkuluProjects = getProjectsForSite('bengkulu-kota', PROJECTS);
  assert.ok(bengkuluProjects.length >= 3);
});

test('projectGeoToMap preserves west-to-east and north-to-south geographic ordering', () => {
  const rambahan = projectGeoToMap(-1.03, 101.47);
  const jakarta = projectGeoToMap(-6.17, 106.82);
  const trowulan = projectGeoToMap(-7.56, 112.38);

  assert.ok(rambahan.x < jakarta.x, 'Sumatra Barat should be west of Jakarta');
  assert.ok(jakarta.x < trowulan.x, 'Jakarta should be west of Trowulan');
  assert.ok(rambahan.y < jakarta.y, 'Sumatra Barat should be north of Jakarta');
  assert.ok(jakarta.y < trowulan.y, 'Jakarta should be north of Trowulan');
});

test('3D point cloud generator & projection produce valid finite coordinates for all models', () => {
  for (const model of SURVEY_MODELS) {
    const cloud = generateSitePointCloud(model.id);
    assert.ok(cloud.length > 200, `Model ${model.id} should have > 200 points`);

    for (const pt of cloud.slice(0, 20)) {
      const projected = projectPoint3D(pt, 0.5, 0.4, 640, 400, 1);
      assert.equal(projected.visible, true);
      assert.ok(Number.isFinite(projected.sx));
      assert.ok(Number.isFinite(projected.sy));
      assert.ok(projected.elevation >= 0 && projected.elevation <= 1);
    }
  }
});
