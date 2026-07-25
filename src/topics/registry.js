import MatrixOps from './MatrixOps'
import Eigen from './Eigen'
import Transformations2D from './Transformations2D'
import Transformations3D from './Transformations3D'
import Determinants from './Determinants'
import Signature from './Signature'
import GaussReduction from './GaussReduction'
import ConicsQuadrics from './ConicsQuadrics'
import EpsilonN from './EpsilonN'
import PowerSeries from './PowerSeries'
import FunctionSeries from './FunctionSeries'
import FormesLineaires from './LinearForms'
import DotProductProjection from './DotProductProjection'
import SymmetricEndomorphisms from './SymmetricEndomorphisms'
import Isometries from './Isometries'

export const topicComponents = {
  'matrix-ops': MatrixOps,
  eigen: Eigen,
  'transformations-2d': Transformations2D,
  'transformations-3d': Transformations3D,
  determinants: Determinants,
  signature: Signature,
  'gauss-reduction': GaussReduction,
  'conics-quadrics': ConicsQuadrics,
  'epsilon-n': EpsilonN,
  'power-series': PowerSeries,
  'function-series': FunctionSeries,
  'formes-lineaires': FormesLineaires,
  'dot-product-projection': DotProductProjection,
  'symmetric-endomorphisms': SymmetricEndomorphisms,
  isometries: Isometries,
}