/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
goog.provide('audioCat.state.command.AddControlPointCommand');

goog.require('audioCat.state.command.Command');


/**
 * Adds a control point to an envelope.
 * @param {!audioCat.state.envelope.Envelope} envelope The envelope.
 * @param {!audioCat.state.envelope.ControlPoint} controlPoint The control point
 *     to add.
 * @param {!audioCat.utility.IdGenerator} idGenerator Generates IDs unique
 *     throughout the application.
 * @constructor
 * @extends {audioCat.state.command.Command}
 */
audioCat.state.command.AddControlPointCommand =
    function(envelope, controlPoint, idGenerator) {
  goog.base(this, idGenerator, true);

  /**
   * The envelope.
   * @private {!audioCat.state.envelope.Envelope}
   */
  this.envelope_ = envelope;

  /**
   * The control point added.
   * @private {!audioCat.state.envelope.ControlPoint}
   */
  this.controlPoint_ = controlPoint;
};
goog.inherits(audioCat.state.command.AddControlPointCommand,
    audioCat.state.command.Command);

/** @override */
audioCat.state.command.AddControlPointCommand.prototype.perform =
    function(project, trackManager) {
  this.envelope_.addControlPoint(this.controlPoint_);
};

/** @override */
audioCat.state.command.AddControlPointCommand.prototype.undo =
    function(project, trackManager) {
  this.envelope_.removeControlPoint(this.controlPoint_);
};

/** @override */
audioCat.state.command.AddControlPointCommand.prototype.getSummary =
    function(forward) {
  return forward ? 'Added control point.' : 'Removed control point.';
};
